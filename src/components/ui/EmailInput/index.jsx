"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailSchema } from "@/lib/schema";
import useStepStore from "@/store/useStepStore";
import { useRouter } from "next/navigation";

export default function EmailInput() {
  const router = useRouter();

  const { setFormDatas, formData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData["-1"],
  }));

  const form = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: formData,
  });

  // 2. Define a submit handler.
  function onSubmit(data) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setFormDatas("-1", data);
    router.push("/balance_sheet");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@gmail.com" {...field} />
              </FormControl>
              <Button type="submit">Submit</Button>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
