import { View, Text, Image } from 'react-native';
import ItemHeader from './ItemHeader';
import ItemMetrics from './ItemMetrics';
import theme from '../../../theme';

const styles = {
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
  }
}

const RepositoryItem = ({ item }) => {
  const headerInfo = {
    ownerAvatarUrl: item.ownerAvatarUrl,
    fullName: item.fullName,
    description: item.description,
    language: item.language,
  };
  const metrics = {
    stargazersCount: item.stargazersCount,
    forksCount: item.forksCount,
    reviewCount: item.reviewCount,
    ratingAverage: item.ratingAverage,
  };

  return (
      <View style={{ backgroundColor: theme.backgroundColors.repositoryItemBackground, padding: 10 }}>
        <ItemHeader info={headerInfo} />
        <ItemMetrics metrics={metrics} />
      </View>
  );
};

export default RepositoryItem;