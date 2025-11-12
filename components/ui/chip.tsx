import { Pressable } from 'react-native';
import { Text } from './Text';

interface Props {
  text: string;
  onSelect: () => void;
  isSelected: boolean;
}

export default function Chip({ text, onSelect, isSelected }: Props) {
  return (
    <Pressable
      onPress={onSelect}
      className={`px-4 py-2 rounded-lg border ${
        isSelected ? 'bg-primary/10 border-primary' : 'bg-white border-gray-300'
      }`}
    >
      <Text
        className={`text-sm ${isSelected ? 'text-primary' : 'text-gray-800'}`}
      >
        {text}
      </Text>
    </Pressable>
  );
}
