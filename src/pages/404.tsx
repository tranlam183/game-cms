import React, { memo } from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Text } from "components/shared";
import { AppHead } from "components";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Stack
      direction="column"
      spacing={2}
      height="100vh"
      m="auto"
      justifyContent="center"
      alignItems="center"
    >
      <AppHead title={t("PageNotFound")} />
      <Text variant="h1" fontWeight={700}>
        {t("Oops!")}
      </Text>
      <Text variant="h5" textTransform="uppercase" fontWeight={700}>
        {t("PageNotFound")}
      </Text>
    </Stack>
  );
};

export default memo(NotFound);
