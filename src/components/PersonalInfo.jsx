"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStepStore from "@/store/useStepStore";
import { Input } from "@/components/ui/input";
import { PersonalSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "./ui/label";
import { useEffect } from "react";
import Comboboxfree from "./ui/combofree";
export default function PersonalInfo({
  prevStep,
  nextStep,
  backable,
  nextable,
}) {
  const { setFormDatas, formData, s } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[0] || {},
  }));
  const form = useForm({
    resolver: zodResolver(PersonalSchema),
    defaultValues: formData,
  });

  const yearOfBrith = form.watch("yearOfBrith"); // Watch startYear field
  useEffect(() => {
    if (yearOfBrith) {
      form.setValue("startOfPlan", calculateAge(yearOfBrith)); // Ensuring endYear is at least one year after startYear
      form.trigger("startOfPlan");
    }
  }, [yearOfBrith, form.setValue, form.trigger]);

  function onSubmit(data) {
    debugger;
    setFormDatas(0, data);
    nextStep();
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nice to meet you</CardTitle>
        <CardDescription>
          Let&apos;s get to know each other. Your information will be use for
          the next step
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-x-2 gap-y-1 grid-cols-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Occupation</FormLabel>
                  <Comboboxfree
                    className="relative flex items-center"
                    predefined={[
                      {
                        heading: "",
                        member: [
                          { label: "Teacher", value: "Teacher" },
                          { label: "Engineer", value: "Engineer" },
                          { label: "Student", value: "Student" },
                          {
                            label: "Financial officier",
                            value: "Financial officier",
                          },
                          { label: "Business man", value: "Business man" },
                        ],
                      },
                    ]}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfBrith"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Year Of Birth</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startOfPlan"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Your age</FormLabel>
                  <FormControl>
                    <Input type="number" disabled {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be your start of plan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endOfPlan"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>End Of Plan</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-4 grid grid-cols-subgrid">
              <Button type="submit" className="col-start-4">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function calculateAge(yearOfBirth) {
  const currentYear = moment().year();
  const age = currentYear - yearOfBirth;
  return age;
}
