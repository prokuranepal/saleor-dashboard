import useNotifier from "@saleor/hooks/useNotifier";
import commonErrorMessages from "@saleor/utils/errors/common";
import { useIntl } from "react-intl";

import { giftCardEnableDisableSectionMessages as messages } from "../messages";
import {
  useGiftCardActivateMutation,
  useGiftCardDeactivateMutation
} from "../mutations";
import { GiftCardActivate } from "../types/GiftCardActivate";
import { GiftCardDeactivate } from "../types/GiftCardDeactivate";

const useGiftCardActivationDeactivation = (
  onActivateActionComplete?: () => void | undefined,
  onDeactivateActionComplete?: () => void | undefined
) => {
  const intl = useIntl();
  const notify = useNotifier();

  const onActivateCompleted = (data: GiftCardActivate) => {
    const errors = data?.giftCardActivate?.errors;

    if (!!errors?.length) {
      notify({
        status: "error",
        text: intl.formatMessage(commonErrorMessages.unknownError)
      });

      return;
    }

    notify({
      status: "success",
      text: intl.formatMessage(messages.successfullyEnabledTitle)
    });

    if (!!onActivateActionComplete) {
      onActivateActionComplete();
    }
  };

  const onDeactivateCompleted = (data: GiftCardDeactivate) => {
    const errors = data?.giftCardDeactivate?.errors;

    if (!!errors?.length) {
      notify({
        status: "error",
        text: intl.formatMessage(commonErrorMessages.unknownError)
      });
      return;
    }

    notify({
      status: "success",
      text: intl.formatMessage(messages.successfullyDisabledTitle)
    });

    if (!!onDeactivateActionComplete) {
      onDeactivateActionComplete();
    }
  };

  const [giftCardActivate, giftCardActivateOpts] = useGiftCardActivateMutation({
    onCompleted: onActivateCompleted
  });

  const [
    giftCardDeactivate,
    giftCardDeactivateOpts
  ] = useGiftCardDeactivateMutation({
    onCompleted: onDeactivateCompleted
  });

  return {
    giftCardActivate,
    giftCardActivateOpts,
    giftCardDeactivate,
    giftCardDeactivateOpts
  };
};

export default useGiftCardActivationDeactivation;
