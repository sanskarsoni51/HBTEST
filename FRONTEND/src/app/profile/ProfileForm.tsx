import React, { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z } from "zod";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/schema/schema";

const profileSchema = z
  .object({
    name: z.string().min(1, "Full name is required").max(100),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .or(z.string().max(0)),
    passwordConfirm: z
      .string()
      .min(1, "Please confirm your password")
      .or(z.string().max(0)),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterInput = TypeOf<typeof profileSchema>;

const ProfileForm = ({ user }: { user: userSchema }) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
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
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Update Successful!",
        variant: "default",
        duration: 2000,
      });
    }

    if (isError) {
      if (error) {
        toast({
          title: "Update Failed",
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
    const arr = Object.entries(values).filter(
      ([key, values]) => values !== "" && key != "email",
    );
    const obj = Object.fromEntries(arr);
    updateUser(obj);
  };
  return (
    <>
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
                  <Input
                    {...field}
                    placeholder="tyler.durden@fightclub.com"
                    disabled
                  />
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
                  <Input
                    {...field}
                    placeholder="You don't talk about it."
                    required={false}
                  />
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
                  <Input
                    {...field}
                    placeholder="Can we have it again. Please?"
                    required={false}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full mb-3" type="submit">
            Update
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
