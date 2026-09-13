import React from "react";
import { Modal, View, Text, Image } from "react-native";
import { normalizeImageSource } from "../utils/imageSource";

// Shared shell for the "item details" modal used by both Home (wishes) and
// My Gifts: title, image, description, location. Each screen still owns its
// own action buttons (Reserve vs Delete are different flows) and passes them
// in as children, right below the location line.
export default function ItemDetailModal({
  visible,
  onClose,
  item,
  descriptionFallback = "",
  locationFallback = "Not specified",
  overlayClassName = "bg-black/55",
  children,
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        className={`flex-1 justify-center items-center px-4 ${overlayClassName}`}
      >
        <View className="bg-[#FFF8F4] w-full rounded-3xl p-5 border border-[#EADFD8]">
          {item && (
            <>
              <Text className="text-xl font-KronaOne mb-3 text-center text-slate-900">
                {item.name}
              </Text>

              <Image
                source={normalizeImageSource(item.image)}
                className="w-full h-52 rounded-2xl mb-4"
                resizeMode="cover"
              />

              <Text className="text-slate-700 mb-1">
                {item.description || descriptionFallback}
              </Text>
              <Text className="text-slate-500 mb-4">
                Location: {item.location || locationFallback}
              </Text>

              {children}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
