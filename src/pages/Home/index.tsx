import { Box, Button, Container, Center, Image, Loader, Text } from "@mantine/core"

import useMeQuery from "../../hooks/useMeQuery";

const Home = () => {
  const { data, isLoading, error, refetch } = useMeQuery();

  return (
    <Container size="xs" px="xs" py="xl">
      {isLoading && (
        <Box>
          <Loader size={125} />
        </Box>
      )}
      {!isLoading && !!error && (
        <Box>
          <Text>Pls try again</Text>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={refetch}>
            <Text>
              Refresh
            </Text>
          </Button>
        </Box>
      )}
      {!isLoading && !error && data && (
        <>
          <Box>
            <Center>
              <Image
                width={167}
                height={200}
                radius="lg"
                src={data.profilePictureUrl}
                alt="profile-picture"
              />
            </Center>
          </Box>
          <Center py="xl">
            <Text size="xl" weight="bold">{data.name}</Text>
          </Center>
        </>
      )}
    </Container>
  );
}

export default Home;
