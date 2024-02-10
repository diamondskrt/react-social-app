import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SignUpValidation } from "@/lib/validation";
import Logo from "@/components/shared/logo"
import { toast } from "sonner";
import { useUserContext } from "@/context/AuthContext";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SignUp() {
  const navigate = useNavigate();
  
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createUserAccount, isPending : isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending : isSigningInUser } = useSignInAccount();

  const handleSignUp = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      await createUserAccount(user)

      await signInAccount({
        email: user.email,
        password: user.password,
      });

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset()
        toast.success("User has been created.")
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.messsage)
      navigate("/sign-in");
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col">
        <Logo />

        <h5 className="pt-5 sm:pt-12">
          Create a new account
        </h5>
        <p className="text-muted-foreground mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isCreatingAccount || isSigningInUser || isUserLoading}>
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}