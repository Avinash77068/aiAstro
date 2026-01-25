import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const YOUTUBE_SHORTS = [
  { id: '1', videoId: 'Cg4psq0N1n8' },
  { id: '2', videoId: 'jNQXAC9IVRw' },
  { id: '3', videoId: '9bZkp7q19f0' },
  { id: '4', videoId: 'kJQP7kiw5Fk' },
  { id: '5', videoId: 'L_jWHffIx5E' },
];

interface VideoItem {
  id: string;
  videoId: string;
}

export default function LiveScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({ '0': true });
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index || 0;
        setCurrentIndex(newIndex);
        
        const newPlaying: { [key: string]: boolean } = {};
        newPlaying[newIndex.toString()] = true;
        setPlaying(newPlaying);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onStateChange = useCallback((state: string, index: number) => {
    if (state === 'ended') {
      setPlaying(prev => ({ ...prev, [index.toString()]: true }));
    }
  }, []);

  const renderItem = ({ item, index }: { item: VideoItem; index: number }) => {
    const isPlaying = playing[index.toString()] || false;

    return (
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={SCREEN_HEIGHT}
          width={SCREEN_WIDTH}
          videoId={item.videoId}
          play={isPlaying}
          onChangeState={(state:any) => onStateChange(state, index)}
          webViewStyle={styles.webview}
          webViewProps={{
            androidLayerType: 'hardware',
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={YOUTUBE_SHORTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
