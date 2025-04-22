"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mt5FormData, mt5Schema } from "@/lib/validations";

const MT5Form = () => {
  const form = useForm<Mt5FormData>({
    resolver: zodResolver(mt5Schema),
    defaultValues: {
      login: "",
      password: "",
      server: "",
    },
  });

  const onSubmit: SubmitHandler<Mt5FormData> = async (data) => {
    try {
      // Send MT5 credentials to the FastAPI backend
      const response = await fetch("http://localhost:8000/connect-mt5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Handle the response from the backend
      const result = await response.json();
  
      // If there is an error, show it
      if (result.success === false) {
        toast.error(`MT5 Error: ${result.error}`);
      } else {
        toast.success(`Connected! Balance: $${result.account.balance}`);
        console.log("Account info:", result.account);
      }
    } catch (err) {
      console.error("MT5 connection error:", err);
      toast.error("Failed to connect to MT5 server");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-black">Connect to your MT5 account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="MT5 Login" {...field} />
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
                  <Input placeholder="MT5 Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="server"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server</FormLabel>
                <FormControl>
                  <Input placeholder="MetaQuotes-Demo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Connect</Button>
        </form>
      </Form>
    </div>
  );
};

export default MT5Form;
