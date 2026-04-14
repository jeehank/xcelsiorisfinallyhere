import { authClient } from "./auth-client";

export const useFormStatus = (formSlug) => {
  const { data: session } = authClient.useSession();
  
  // If no session, assume they shouldn't see it (or handle auth redirect)
  if (!session) return { shouldShow: false, isLoading:true};

  const hasFinished = (session.user as any).slugs.includes(formSlug);
  
  return { 
    shouldShow: !hasFinished,
    isLoading: false
  };
};