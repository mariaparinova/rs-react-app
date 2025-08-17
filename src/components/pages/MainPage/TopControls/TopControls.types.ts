export interface TopControlsProps {
  initialSearchTerm: string;
  isLoading: boolean;
  onSearchTermChange: (searchTerm: string) => void;
}
