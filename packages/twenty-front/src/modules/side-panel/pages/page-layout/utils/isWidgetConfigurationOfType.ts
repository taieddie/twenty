import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';

import { type FieldConfiguration } from '@/page-layout/types/FieldConfiguration';
import {
  type AggregateChartConfiguration,
  type BarChartConfiguration,
  type CalendarConfiguration,
  type CallRecordingSummaryConfiguration,
  type CallRecordingTranscriptConfiguration,
  type ChatConfiguration,
  type ChatThreadsConfiguration,
  type EmailThreadConfiguration,
  type EmailsConfiguration,
  type FieldRichTextConfiguration,
  type FieldsConfiguration,
  type FilesConfiguration,
  type FormFieldConfiguration,
  type FrontComponentConfiguration,
  type IframeConfiguration,
  type LineChartConfiguration,
  type MessageCampaignBodyConfiguration,
  type MessageCampaignDetailsConfiguration,
  type NotesConfiguration,
  type PieChartConfiguration,
  type RecordTableConfiguration,
  type StandaloneRichTextConfiguration,
  type TasksConfiguration,
  type TimelineConfiguration,
  type ViewConfiguration,
  type WidgetConfiguration,
  WidgetConfigurationType,
  type WorkflowConfiguration,
  type WorkflowRunConfiguration,
  type WorkflowVersionConfiguration,
} from '~/generated-metadata/graphql';

type WidgetConfigurationTypenameMap = {
  AggregateChartConfiguration: Omit<
    AggregateChartConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.AGGREGATE_CHART;
  };
  BarChartConfiguration: Omit<BarChartConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.BAR_CHART;
  };
  CalendarConfiguration: Omit<CalendarConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.CALENDAR;
  };
  FrontComponentConfiguration: Omit<
    FrontComponentConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.FRONT_COMPONENT;
  };
  EmailThreadConfiguration: Omit<
    EmailThreadConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.EMAIL_THREAD;
  };
  CallRecordingSummaryConfiguration: Omit<
    CallRecordingSummaryConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.CALL_RECORDING_SUMMARY;
  };
  CallRecordingTranscriptConfiguration: Omit<
    CallRecordingTranscriptConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.CALL_RECORDING_TRANSCRIPT;
  };
  ChatThreadsConfiguration: Omit<
    ChatThreadsConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.CHAT_THREADS;
  };
  ChatConfiguration: Omit<ChatConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.CHAT;
  };
  MessageCampaignBodyConfiguration: Omit<
    MessageCampaignBodyConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.MESSAGE_CAMPAIGN_BODY;
  };
  MessageCampaignDetailsConfiguration: Omit<
    MessageCampaignDetailsConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.MESSAGE_CAMPAIGN_DETAILS;
  };
  EmailsConfiguration: Omit<EmailsConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.EMAILS;
  };
  FieldConfiguration: Omit<FieldConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.FIELD;
  };
  FieldRichTextConfiguration: Omit<
    FieldRichTextConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.FIELD_RICH_TEXT;
  };
  FieldsConfiguration: Omit<FieldsConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.FIELDS;
  };
  FormFieldConfiguration: Omit<FormFieldConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.FORM_FIELD;
  };
  FilesConfiguration: Omit<FilesConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.FILES;
  };
  IframeConfiguration: Omit<IframeConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.IFRAME;
  };
  LineChartConfiguration: Omit<LineChartConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.LINE_CHART;
  };
  NotesConfiguration: Omit<NotesConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.NOTES;
  };
  PieChartConfiguration: Omit<PieChartConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.PIE_CHART;
  };
  RecordTableConfiguration: Omit<
    RecordTableConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.RECORD_TABLE;
  };
  StandaloneRichTextConfiguration: Omit<
    StandaloneRichTextConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.STANDALONE_RICH_TEXT;
  };
  TasksConfiguration: Omit<TasksConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.TASKS;
  };
  TimelineConfiguration: Omit<TimelineConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.TIMELINE;
  };
  ViewConfiguration: Omit<ViewConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.VIEW;
  };
  WorkflowConfiguration: Omit<WorkflowConfiguration, 'configurationType'> & {
    configurationType: WidgetConfigurationType.WORKFLOW;
  };
  WorkflowRunConfiguration: Omit<
    WorkflowRunConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.WORKFLOW_RUN;
  };
  WorkflowVersionConfiguration: Omit<
    WorkflowVersionConfiguration,
    'configurationType'
  > & {
    configurationType: WidgetConfigurationType.WORKFLOW_VERSION;
  };
};

type WidgetConfigurationTypename = keyof WidgetConfigurationTypenameMap;

export const WIDGET_TYPENAME_TO_CONFIGURATION_TYPE_MAP: Record<
  WidgetConfigurationTypename,
  WidgetConfigurationType
> = {
  AggregateChartConfiguration: WidgetConfigurationType.AGGREGATE_CHART,
  BarChartConfiguration: WidgetConfigurationType.BAR_CHART,
  CalendarConfiguration: WidgetConfigurationType.CALENDAR,
  FrontComponentConfiguration: WidgetConfigurationType.FRONT_COMPONENT,
  EmailThreadConfiguration: WidgetConfigurationType.EMAIL_THREAD,
  CallRecordingSummaryConfiguration:
    WidgetConfigurationType.CALL_RECORDING_SUMMARY,
  CallRecordingTranscriptConfiguration:
    WidgetConfigurationType.CALL_RECORDING_TRANSCRIPT,
  ChatThreadsConfiguration: WidgetConfigurationType.CHAT_THREADS,
  ChatConfiguration: WidgetConfigurationType.CHAT,
  MessageCampaignBodyConfiguration:
    WidgetConfigurationType.MESSAGE_CAMPAIGN_BODY,
  MessageCampaignDetailsConfiguration:
    WidgetConfigurationType.MESSAGE_CAMPAIGN_DETAILS,
  EmailsConfiguration: WidgetConfigurationType.EMAILS,
  FieldConfiguration: WidgetConfigurationType.FIELD,
  FieldRichTextConfiguration: WidgetConfigurationType.FIELD_RICH_TEXT,
  FieldsConfiguration: WidgetConfigurationType.FIELDS,
  FormFieldConfiguration: WidgetConfigurationType.FORM_FIELD,
  FilesConfiguration: WidgetConfigurationType.FILES,
  IframeConfiguration: WidgetConfigurationType.IFRAME,
  LineChartConfiguration: WidgetConfigurationType.LINE_CHART,
  NotesConfiguration: WidgetConfigurationType.NOTES,
  PieChartConfiguration: WidgetConfigurationType.PIE_CHART,
  RecordTableConfiguration: WidgetConfigurationType.RECORD_TABLE,
  StandaloneRichTextConfiguration: WidgetConfigurationType.STANDALONE_RICH_TEXT,
  TasksConfiguration: WidgetConfigurationType.TASKS,
  TimelineConfiguration: WidgetConfigurationType.TIMELINE,
  ViewConfiguration: WidgetConfigurationType.VIEW,
  WorkflowConfiguration: WidgetConfigurationType.WORKFLOW,
  WorkflowRunConfiguration: WidgetConfigurationType.WORKFLOW_RUN,
  WorkflowVersionConfiguration: WidgetConfigurationType.WORKFLOW_VERSION,
};

export const isWidgetConfigurationOfType = <
  T extends WidgetConfigurationTypename,
>(
  configuration:
    | WidgetConfiguration
    | FieldsConfiguration
    | FieldConfiguration
    | Record<string, unknown>
    | null
    | undefined,
  typename: T,
): configuration is WidgetConfigurationTypenameMap[T] => {
  if (!configuration || typeof configuration !== 'object') {
    return false;
  }

  if (isNonEmptyString(configuration.__typename)) {
    return configuration.__typename === typename;
  }

  const expectedConfigurationType =
    WIDGET_TYPENAME_TO_CONFIGURATION_TYPE_MAP[typename];

  return (
    isDefined(expectedConfigurationType) &&
    'configurationType' in configuration &&
    configuration.configurationType === expectedConfigurationType
  );
};
