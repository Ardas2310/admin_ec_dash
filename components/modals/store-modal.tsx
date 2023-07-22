// In order to create the Form , we have to install zod and some other
// components. Then create a function that holds the name and the other
// form fields and use the spread operator {...something} in order to access all the attributes


"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";


const formSchema = z.object({
    name: z.string().min(1),
})



export const StoreModal = () => {
    const storeModal = useStoreModal();

    // in order for this to work we installed a package named axios
    const [loading ,setLoading] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            // shows the app/api/stores/route.ts and stores the values
            const response = await axios.post('/api/stores', values)

            toast.success("Store created.")
        } catch(error){
            // to handle error better we installed react hot toast
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return(
        <Modal
            title="Create Store"
            description="Add a new store to manage product and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} 
                                            placeholder="E-commerce" 
                                            {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                disabled={loading}
                                variant="outline"
                                onClick={storeModal.onClose}>
                                    Cancel
                                </Button>
                                <Button 
                                disabled={loading}
                                type="submit">
                                    Continue
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
        
    )
}