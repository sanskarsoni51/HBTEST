
import React, { useState, useEffect } from "react";

import { useUpdateProfileMutation } from "@/redux/api/userApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { userSchema } from "@/schema/schema";

// Validation schemas
const nameSchema = z.object({
  name: z.string().min(1, "Full name is required").max(100),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const addressSchema = z.object({
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pinCode: z
      .number()
      .positive("PinCode must be positive")
      .min(10000, "PinCode must have 5 digits")
      .max(999999, "PinCode must have at most 6 digits"),
  }),
});

export type NameInput = TypeOf<typeof nameSchema>;
export type PasswordInput = TypeOf<typeof passwordSchema>;
export type AddressInput = TypeOf<typeof addressSchema>;

const ProfileForm = ({ user }: { user: userSchema }) => {

  const [isEditing, setIsEditing] = useState(false); // New state to toggle edit mode

  const nameForm = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user.name || "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: user.address[0] || {
        street: "",
        city: "",
        state: "",
        country: "",

        pinCode: "",

      },
    },
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
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
      toast({
        title: "Update Failed",
        description: `${error}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [isSuccess, isError]);

  return (
    <div className="container px-0">
      <Button
        onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
        className="mb-4"
      >
        {isEditing ? "Cancel Editing" : "Edit Profile"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side (Name and Password Cards) */}
        <div>
          {/* Name Section */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {!isEditing ? "Full Name" : "Update Name"}
              </h2>
            </CardHeader>
            <CardContent>
              <Form {...nameForm}>
                <form
                  onSubmit={nameForm.handleSubmit((values) =>
                    updateUser({ name: values.name })
                  )}
                >
                  <FormField
                    control={nameForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={!isEditing} // Disable input if not editing
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {isEditing && (
                    <Button className="mt-4" type="submit" disabled={isLoading}>
                      Update Name
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {!isEditing ? "Password" : "Update Password"}
              </h2>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit((values) =>
                    updateUser({ password: values.password })
                  )}
                >
                  {!isEditing ? (
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="********"
                              disabled={!isEditing} // Disable input if not editing
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div>
                      <FormField
                        control={passwordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="********"
                                disabled={!isEditing} // Disable input if not editing
                              />
                            </FormControl>
                            {/* {passwordForm.formState.errors.password && (
                              <p className="text-red-500 text-sm mt-1">
                                {passwordForm.formState.errors.password.message}
                              </p>
                            )} */}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="********"
                                disabled={!isEditing} // Disable input if not editing
                              />
                            </FormControl>
                            {passwordForm.formState.errors.password && (
                              <p className="text-red-500 text-sm mt-1">
                                {passwordForm.formState.errors.password.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {isEditing && (
                    <Button className="mt-4" type="submit" disabled={isLoading}>
                      Update Password
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side (Address Card) */}
        <div>
          {/* Address Section */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {!isEditing ? "Address" : "Update Address"}
              </h2>
            </CardHeader>
            <CardContent>
              <Form {...addressForm}>
                <form
                  onSubmit={addressForm.handleSubmit((values) =>
                    updateUser({ address: values.address })
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={addressForm.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="123 Main St"
                              disabled={!isEditing} // Disable input if not editing
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="City Name"
                              disabled={!isEditing} // Disable input if not editing
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="State Name"
                              disabled={!isEditing} // Disable input if not editing
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Country Name"
                              disabled={!isEditing} // Disable input if not editing
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="address.pinCode"
                      render={({ field }) => (
                        <FormItem className="my-3">
                          <FormLabel>Pin Code:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="123456"
                              disabled={!isEditing} // Disable input if not editing
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value || ""}
                            />
                          </FormControl>
                          {addressForm.formState.errors.address?.pinCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                addressForm.formState.errors.address.pinCode
                                  .message
                              }
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  {isEditing && (
                    <Button className="mt-4" type="submit" disabled={isLoading}>
                      Update Address
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
