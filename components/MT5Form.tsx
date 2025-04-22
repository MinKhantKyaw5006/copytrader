"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

type AccountInfo = {
  login: number;
  name: string;
  balance: number;
  equity: number;
  margin: number;
  leverage: number;
  currency: string;
};

const MT5Form = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

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
      const response = await fetch("http://127.0.0.1:8000/connect-mt5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        toast.error(`MT5 Error: ${result.error}`);
      } else {
        toast.success(`Connected to ${result.name}: Balance $${result.balance}`);
        setAccountInfo(result);
      }
    } catch (err) {
      console.error("MT5 connection error:", err);
      toast.error("Failed to connect to MT5 server");
    }
  };

  return (
    <div className="space-y-6">
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

      {accountInfo && (
        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Connected Account Info
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Name:</strong> {accountInfo.name}</li>
            <li><strong>Login:</strong> {accountInfo.login}</li>
            <li><strong>Balance:</strong> ${accountInfo.balance}</li>
            <li><strong>Equity:</strong> ${accountInfo.equity}</li>
            <li><strong>Margin:</strong> ${accountInfo.margin}</li>
            <li><strong>Leverage:</strong> 1:{accountInfo.leverage}</li>
            <li><strong>Currency:</strong> {accountInfo.currency}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MT5Form;
