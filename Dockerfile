# Stage 1: Base - System dependencies
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
# Copy only manifest files for better caching
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install all dependencies (including dev)
RUN npm ci

# Stage 3: Builder - Application build
FROM base AS builder
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source files
COPY . .

# Build-time environment variables for Clerk/Next.js
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_SIGN_IN_URL}
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_SIGN_UP_URL}
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}

# Required for Prisma and Next.js standalone build
ENV NODE_ENV=production

# Re-generate Prisma Client to ensure it matches the OS
RUN npx prisma generate
RUN npm run build

# Stage 4: Runner - Production runtime
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the necessary files for the standalone server
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Next.js standalone output creates a server.js file
CMD ["node", "server.js"]
