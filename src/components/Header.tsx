import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

const Header = (): React.ReactElement => {
  return (
    <Box>
      <h1>
        <Text fontSize='3xl'>東海DB</Text>
      </h1>
      <Text>東海オンエアのみんなのすきなシーンのデータベース</Text>
    </Box>
  );
};

export default Header;
