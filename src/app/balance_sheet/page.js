import BalanceForm from "@/components/BalanceForm";
import LifeEvent from "@/components/LifeEvent";
import PersonalInfo from "@/components/PersonalInfo";
import VerticalSteps from "@/components/ui/VerticalSteps";

export default function BalanceSheet() {
  return (
    <div className="pt-5 container max-w-screen-xl m-auto h-full">
      <VerticalSteps>
        <PersonalInfo />
        <BalanceForm />
        <LifeEvent />
      </VerticalSteps>
    </div>
  );
}
