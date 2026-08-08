import * as React from "react";
import {
  EmailLayout,
  Heading,
  Section,
  Text,
  MutedText,
  Divider,
  Button,
} from "@/lib/email/components";
import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email/constants";
import type { ReviewNotificationEmailProps } from "@/lib/email/types/email-props";

export default function ReviewNotificationEmail({
  recipientName,
  businessName,
  reviewerName,
  rating,
  reviewComment,
  reviewDate,
  viewReviewUrl,
}: ReviewNotificationEmailProps): React.JSX.Element {
  const stars =
    "★".repeat(Math.min(Math.max(rating, 0), 5)) +
    "☆".repeat(Math.max(0, 5 - Math.min(Math.max(rating, 0), 5)));

  return (
    <EmailLayout
      previewText={`New ${rating}-star review for ${businessName} on ${EMAIL_BRAND.name}`}
    >
      <Section style={styles.container}>
        <Heading style={styles.heading}>New Review Received</Heading>

        <Text style={styles.text}>Hello {recipientName},</Text>

        <Text style={styles.text}>
          <span style={styles.highlight}>{reviewerName}</span> left a new review for{" "}
          <span style={styles.highlight}>{businessName}</span>.
        </Text>

        <Section style={styles.reviewCard}>
          <Text style={styles.ratingText}>
            {stars} <span style={styles.ratingNumber}>({rating}/5)</span>
          </Text>

          {reviewComment ? <Text style={styles.commentText}>&ldquo;{reviewComment}&rdquo;</Text> : null}

          {reviewDate ? <Text style={styles.dateText}>Posted on {reviewDate}</Text> : null}
        </Section>

        <Text style={styles.text}>
          You can read the full review and respond to customer feedback directly from your business
          account.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={viewReviewUrl} style={styles.button}>
            View Review
          </Button>
        </Section>

        <Divider style={styles.divider} />

        <MutedText style={styles.mutedText}>
          You are receiving this notification because you manage {businessName} on{" "}
          {EMAIL_BRAND.name}.
        </MutedText>
      </Section>
    </EmailLayout>
  );
}

const styles = {
  container: {
    padding: "0 24px",
  },
  heading: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "left" as const,
    margin: "0 0 20px",
  },
  text: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  highlight: {
    color: EMAIL_COLORS.textPrimary,
    fontWeight: "600",
  },
  reviewCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: `1px solid ${EMAIL_COLORS.border}`,
    padding: "16px",
    margin: "16px 0",
  },
  ratingText: {
    color: "#f59e0b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  ratingNumber: {
    color: EMAIL_COLORS.textSecondary,
    fontSize: "14px",
    fontWeight: "normal",
  },
  commentText: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: "15px",
    fontStyle: "italic",
    lineHeight: "22px",
    margin: "0 0 8px",
  },
  dateText: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "12px",
    margin: "0",
  },
  buttonContainer: {
    margin: "24px 0",
    textAlign: "center" as const,
  },
  button: {
    backgroundColor: EMAIL_COLORS.primary,
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
  },
  divider: {
    borderColor: EMAIL_COLORS.border,
    margin: "24px 0",
  },
  mutedText: {
    color: EMAIL_COLORS.textMuted,
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0",
  },
};
