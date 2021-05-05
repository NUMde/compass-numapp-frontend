import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import config from '../../config/configProvider';

/**
 * @param {object} props 
 * @param {number} progress the progress as decimal between 0 and 1 
 */
const ProgressBar = (props) => {
  //save progress in state
  const [progress, setProgress] = useState(0);
  // init width of progress bar with progress
  const width = useRef(new Animated.Value(0)).current;

  // run animation when view gets updated
  useEffect(
    () => {
      Animated.timing(width, {
        toValue: props.progress,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start();
      return () => {};
    },
    // only update when props have changed
    [props.progress]
  );

  return (
    <View style={localstyles.container} >
      <Animated.View
        style={[
          localstyles.progressBar,
          {
            //interpolate width, i.e. map decimal value to value in percent
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const localstyles = StyleSheet.create({
  // styling for the container of the progressbar
  container: {
    width: "95%",
    alignSelf: "center",
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 5,
    backgroundColor: config.theme.colors.accent2
  },
  // styling for the progressbar itself
  progressBar: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: config.theme.colors.primary
  },
});

export default ProgressBar;
