// Have to create this whole path so I can
// install clerk sign in and sign up provider to my code

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}