import Image from "next/image";
import { useTranslation } from "../i18n";

export default async function Home() {
  const { t } = await useTranslation("en");
  return (
    <main className="container mx-auto">
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}
