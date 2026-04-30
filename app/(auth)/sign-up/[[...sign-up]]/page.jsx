import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <SignUp 
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none border-none",
                    headerTitle: "text-white font-bold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary: "bg-primary hover:bg-primary/90 text-white font-semibold transition-all",
                    socialButtonsBlockButton: "border-white/10 hover:bg-white/5 text-white transition-colors",
                    socialButtonsBlockButtonText: "text-white font-medium",
                    formFieldLabel: "text-gray-300",
                    formFieldInput: "bg-black/20 border-white/10 text-white focus:border-primary transition-colors",
                    footerActionText: "text-gray-400",
                    footerActionLink: "text-primary hover:text-primary/80 transition-colors"
                }
            }}
        />
    );
}