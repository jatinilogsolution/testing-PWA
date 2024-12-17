<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authStore'
import { userLoginProps } from '@/types'
import { ref } from 'vue'
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from 'vue-router'
const { toast } = useToast();
const router = useRouter();
const user = ref<userLoginProps>({
    username: "",
    password: "",
})
const store = useAuthStore();
const userLogin = () => {
    console.log("User Login Successful", user.value)
    store.getClient(user.value).then((client) => {
        console.log("Client Successful", client);
        toast({
            title: client.message,
            variant: "default",
            class: client.css
        })
        router.push("/");
    }).catch((error) => {
        console.error("User Login Failed", error)
        toast({
            title: "Login Failed!",
            description: `${error.message}`,
            variant: "destructive"
        })
    })
}
</script>

<template>
    <div class=" h-dvh flex items-center justify-center">
        <Card class="w-[350px]">
            <CardHeader class=" text-center">
                <img alt="logo" src="https://www.vianaar.com/images-vianaar/logo.svg" class=" h-16 mb-6" />
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="userLogin">
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="username">Username</Label>
                            <Input id="username" v-model="user.username" placeholder="Username" />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" v-model="user.password" placeholder="Password" />
                        </div>
                    </div>
                    <Button class=" w-full mt-5" type="submit">Login</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>