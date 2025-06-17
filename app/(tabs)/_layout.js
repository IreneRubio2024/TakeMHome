import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTitle from "../../components/CustomTitle";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgba(30, 30, 30, 1)",
          height: 180,
        },
        headerTitle: () => <CustomTitle />,

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "KronaOne-Regular",
          color: "#1EFF00",
        },

        headerRight: () => (
          <>
            <MaterialIcons
              name="menu"
              size={24}
              color="white"
              style={{ marginRight: 10, marginTop: 0 }}
            />
          </>
        ),

        sceneContainerStyle: {
          backgroundColor: "rgba(242, 242, 242)",
        },

        tabBarStyle: {
          backgroundColor: "rgba(242, 242, 242)",
          height: 70,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="myPresents"
        options={{
          title: "My Gifts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="star" color="#FF631B" />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color="#FF631B" />
          ),
        }}
      />
      <Tabs.Screen
        name="myWhishes"
        options={{
          title: "My Whishes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="auto-awesome" size={24} color="#FF631B" />
          ),
        }}
      />
    </Tabs>
  );
}
