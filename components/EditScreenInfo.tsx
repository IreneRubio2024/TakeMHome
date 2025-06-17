import React from "react";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <Box>
      <Box className="items-center mx-4">
        <Text className="text-center text-black/80"></Text>
        <Box className="rounded-sm px-1 my-2 bg-secondary-200">
          <Text className="text-sm leading-5 text-center font-SpaceMono">
            {path}
          </Text>
        </Box>

        <Text className="text-center text-black/80"></Text>
      </Box>

      <Box className="mt-4 mx-5 items-center">
        <Text className="text-center"></Text>
      </Box>
    </Box>
  );
}
