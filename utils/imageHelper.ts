import { ImageSourcePropType } from "react-native";

export type ImageSource = string | number;

export function resolveImageSource(image: ImageSource): ImageSourcePropType {
  if (typeof image === "string") {
    return { uri: image };
  }
  return image;
}
