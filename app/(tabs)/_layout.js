import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTitle from "../../components/CustomTitle";
import { TouchableOpacity, Text, View, Linking } from "react-native";
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
        headerTitleAlign: "left",
        headerTitleContainerStyle: { marginLeft: 4 },
        headerRightContainerStyle: { paddingRight: 12 },

        headerTintColor: "#fff",
        headerTitleStyle: { fontFamily: "KronaOneRegular" },

        headerRight: () => (
          <View style={{ alignItems: "flex-end", gap: 8 }}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.irene-rubio.com")}
              accessibilityRole="link"
              accessibilityLabel="Back to portfolio"
              hitSlop={{ top: 8, bottom: 4, left: 16, right: 4 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <MaterialIcons name="arrow-back" size={14} color="#FDE7DF" />
                <Text
                  style={{
                    color: "#FDE7DF",
                    fontSize: 10,
                    fontFamily: "KronaOneRegular",
                    opacity: 0.8,
                  }}
                >
                  portfolio
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/")}
              accessibilityRole="button"
              accessibilityLabel="Logout"
              accessibilityHint="Returns to the login screen"
              hitSlop={{ top: 4, bottom: 8, left: 16, right: 4 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <MaterialIcons name="logout" size={18} color="#FDE7DF" />
                <Text
                  style={{
                    color: "#FDE7DF",
                    fontSize: 10,
                    fontFamily: "KronaOneRegular",
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={24} color={color} />
          ),
        }}
      />
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
