"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/authApi";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(1, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof FormSchema>;

// Main Function
export function LoginInner() {
  const location = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;
  const from: string = location ? location : "/";

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Login Successful",
        variant: "default",
        duration: 1500,
      });
      redirect(from);
    }
    if (isError) {
      toast({
        title: "Login Failed",
        description: isError,
        variant: "destructive",
        duration: 1500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    loginUser({ email: data.email, password: data.password });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-brown text-xl font-semibold"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Email:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="tyler.durden@fightclub.com" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Password:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="You don't talk about it."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full my-3" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
