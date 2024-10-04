import SignIn from "@/components/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود",
};

export default function SingInPage() {
  return <SignIn />;
}
