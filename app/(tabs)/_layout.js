import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTitle from "../../components/CustomTitle";
import { TouchableOpacity, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7A3A23",
          height: 128,
        },
        headerTitle: () => <CustomTitle />,

        headerTintColor: "#fff",
        headerTitleStyle: { fontFamily: "KronaOneRegular" },

        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.replace("/")}
            accessibilityRole="button"
            accessibilityLabel="Logout"
            accessibilityHint="Returns to the login screen"
            accessibilityState={{ disabled: false }}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{
              marginRight: 14,
              minWidth: 44,
              minHeight: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialIcons name="logout" size={20} color="#FDE7DF" />
              <Text
                style={{
                  color: "#FDE7DF",
                  fontSize: 11,
                  fontFamily: "KronaOneRegular",
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        ),

        sceneContainerStyle: {
          backgroundColor: "#FCF6F2",
        },

        tabBarStyle: {
          backgroundColor: "#FFF8F4",
          borderTopColor: "#EADFD8",
          borderTopWidth: 1,
          height: 74,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#B85C38",
        tabBarInactiveTintColor: "#64748B",
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "KronaOneRegular",
        },
      }}
    >
      <Tabs.Screen
        name="myPresents"
        options={{
          title: "My Gifts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name="redeem" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myWhishes"
        options={{
          title: "My Whishes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mailbox"
        options={{
          title: "Mailbox",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="mail" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
