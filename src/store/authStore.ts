import axiosClient from "@/action/api";
import { useToast } from "@/components/ui/toast";
import { userLoginProps } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const { toast } = useToast();

  const isAuthenticated = ref(false);
  const Client = ref({
    userId: "",
    userWarehouseId: "",
    userType: "",
  });

  const TOKEN = ref<string | null>(sessionStorage.getItem("token"));

  const getClient = async (userdata: userLoginProps) => {
    if (!userdata.password || !userdata.username) {
      return {
        message: "Please provide credentials",
        css: "text-[red]  font-semibold",
      };
    }
    try {
      const response = await axiosClient.post("/login", {
        uID: userdata.username,
        pass: userdata.password,
      });
      const data = response.data;

      isAuthenticated.value = true;
      TOKEN.value = data.token;
      Client.value.userId = data.uID;
      Client.value.userWarehouseId = data.WHID;
      Client.value.userType = data.usertype;

      sessionStorage.setItem("userType", data.user.user_type);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.user.ID);
      sessionStorage.setItem("userWarehouseId", data.user.WHID);

      return {
        message: "Login Successfull!",
        css: "text-[green]  font-semibold",
      };
    } catch (error: any) {
      console.error("Error in authentication", error.message);

      return { message: "Server Error.", css: "text-[red]  font-semibold" };
    }
  };

  const logout = () => {
    sessionStorage.clear();
    isAuthenticated.value = false;
    Client.value = {
      userId: "",
      userWarehouseId: "",
      userType: "",
    };

    toast({
      title: "Logout successfull.",
      class: " text-[green] fond-medium",
    });

    window.location.replace("/");
  };

  const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  };

  //session
  const userType: string | null = sessionStorage.getItem("userType");

  const warehouseId = ref<string | null>(null); // Type as a string or null
  if (userType === "admin") {
    warehouseId.value = sessionStorage.getItem("warehouseId");
  } else {
    warehouseId.value = sessionStorage.getItem("userWarehouseId");
  }
  const clientId = ref(sessionStorage.getItem("clientId"));
  const userId = ref(sessionStorage.getItem("userId"));
 

  return {
    getClient,
    TOKEN,
    logout,
    Client,
    isAuthenticated,
    setIsAuthenticated,
    session: {
      userType,
      warehouseId,
      clientId,
      userId,
    },
  };
});
