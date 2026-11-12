import { redirect } from "next/navigation";

export default function OrderIndexRedirect() {
  redirect("/cart");
}
