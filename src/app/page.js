import Image from "next/image";
import { useTranslation } from "../i18n";
import EmailInput from "@/components/ui/EmailInput";

export default async function Home() {
  const { t } = await useTranslation("en", "home");
  return (
    <main className="container mx-auto max-w-screen-lg h-full flex flex-col items-center justify-center">
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
      <EmailInput />
    </main>
  );
}
