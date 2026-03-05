import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface ActionToastProps {
  visible: boolean;
  icon: React.ReactNode;
  message: string;
  onHide: () => void;
}

function ActionToast({ visible, icon, message, onHide }: ActionToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  const hideToast = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  }, [opacity, onHide]);

  useEffect(() => {
    if (visible) {
      opacity.setValue(0);
      scale.setValue(0.7);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(hideToast, 1200);
      return () => clearTimeout(timer);
    }
  }, [visible, opacity, scale, hideToast]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View style={[styles.toast, { opacity, transform: [{ scale }] }]}>
        {icon}
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
}

export default React.memo(ActionToast);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    backgroundColor: "rgba(0,0,0,0.82)",
    borderRadius: 18,
    paddingHorizontal: 30,
    paddingVertical: 22,
    alignItems: "center",
    gap: 10,
    minWidth: 140,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
