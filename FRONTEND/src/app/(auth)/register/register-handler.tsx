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
import { useRegisterUserMutation } from "@/redux/api/authApi";

const registerSchema = z.object({
    name: z.string().min(1, "Full name is required").max(100),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterInput = TypeOf<typeof registerSchema>;

// Main Function
export function RegisterInner() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  // 👇 Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Registration Successful!",
        variant: "default",
        duration: 2000,
      });
    }

    if (isError) {
      if (error) {
        toast({
          title: "Registration Failed",
          description: `${error}`,
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          title: "Network Error. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<RegisterInput> = (values) => {
    registerUser({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  };

  return (
  <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)}
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
        name="name"
        render={({ field }) => (
          <FormItem className="my-3">
            <FormLabel className="flex flex-row font-semibold">
              Name:
              <FormMessage className="ml-3 font-medium" />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Tyler Durden" />
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
              <Input {...field} placeholder="You don't talk about it." />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="passwordConfirm"
        render={({ field }) => (
          <FormItem className="my-3">
            <FormLabel className="flex flex-row font-semibold">
              Confirm Parrsword:
              <FormMessage className="ml-3 font-medium" />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Can we have it again. Please?" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button className="w-full mb-3" type="submit">
        Register
      </Button>
    </form>
  </Form>
);

};
