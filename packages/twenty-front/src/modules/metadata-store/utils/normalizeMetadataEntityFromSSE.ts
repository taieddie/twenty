import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';

import { type MetadataEntityKey } from '@/metadata-store/states/metadataStoreState';
import { WidgetConfigurationType } from '~/generated-metadata/graphql';

export type WidgetConfigurationTypename =
  | 'AggregateChartConfiguration'
  | 'BarChartConfiguration'
  | 'CalendarConfiguration'
  | 'CallRecordingSummaryConfiguration'
  | 'CallRecordingTranscriptConfiguration'
  | 'ChatConfiguration'
  | 'ChatThreadsConfiguration'
  | 'EmailThreadConfiguration'
  | 'EmailsConfiguration'
  | 'FieldConfiguration'
  | 'FieldRichTextConfiguration'
  | 'FieldsConfiguration'
  | 'FilesConfiguration'
  | 'FormFieldConfiguration'
  | 'FrontComponentConfiguration'
  | 'IframeConfiguration'
  | 'LineChartConfiguration'
  | 'MessageCampaignBodyConfiguration'
  | 'MessageCampaignDetailsConfiguration'
  | 'NotesConfiguration'
  | 'PieChartConfiguration'
  | 'RecordTableConfiguration'
  | 'StandaloneRichTextConfiguration'
  | 'TasksConfiguration'
  | 'TimelineConfiguration'
  | 'ViewConfiguration'
  | 'WorkflowConfiguration'
  | 'WorkflowRunConfiguration'
  | 'WorkflowVersionConfiguration';

export const CONFIGURATION_TYPE_TO_WIDGET_TYPENAME_MAP: Record<
  WidgetConfigurationType,
  WidgetConfigurationTypename
> = {
  [WidgetConfigurationType.AGGREGATE_CHART]: 'AggregateChartConfiguration',
  [WidgetConfigurationType.BAR_CHART]: 'BarChartConfiguration',
  [WidgetConfigurationType.CALENDAR]: 'CalendarConfiguration',
  [WidgetConfigurationType.CALL_RECORDING_SUMMARY]:
    'CallRecordingSummaryConfiguration',
  [WidgetConfigurationType.CALL_RECORDING_TRANSCRIPT]:
    'CallRecordingTranscriptConfiguration',
  [WidgetConfigurationType.CHAT]: 'ChatConfiguration',
  [WidgetConfigurationType.CHAT_THREADS]: 'ChatThreadsConfiguration',
  [WidgetConfigurationType.EMAIL_THREAD]: 'EmailThreadConfiguration',
  [WidgetConfigurationType.EMAILS]: 'EmailsConfiguration',
  [WidgetConfigurationType.FIELD]: 'FieldConfiguration',
  [WidgetConfigurationType.FIELD_RICH_TEXT]: 'FieldRichTextConfiguration',
  [WidgetConfigurationType.FIELDS]: 'FieldsConfiguration',
  [WidgetConfigurationType.FILES]: 'FilesConfiguration',
  [WidgetConfigurationType.FORM_FIELD]: 'FormFieldConfiguration',
  [WidgetConfigurationType.FRONT_COMPONENT]: 'FrontComponentConfiguration',
  [WidgetConfigurationType.IFRAME]: 'IframeConfiguration',
  [WidgetConfigurationType.LINE_CHART]: 'LineChartConfiguration',
  [WidgetConfigurationType.MESSAGE_CAMPAIGN_BODY]:
    'MessageCampaignBodyConfiguration',
  [WidgetConfigurationType.MESSAGE_CAMPAIGN_DETAILS]:
    'MessageCampaignDetailsConfiguration',
  [WidgetConfigurationType.NOTES]: 'NotesConfiguration',
  [WidgetConfigurationType.PIE_CHART]: 'PieChartConfiguration',
  [WidgetConfigurationType.RECORD_TABLE]: 'RecordTableConfiguration',
  [WidgetConfigurationType.STANDALONE_RICH_TEXT]:
    'StandaloneRichTextConfiguration',
  [WidgetConfigurationType.TASKS]: 'TasksConfiguration',
  [WidgetConfigurationType.TIMELINE]: 'TimelineConfiguration',
  [WidgetConfigurationType.VIEW]: 'ViewConfiguration',
  [WidgetConfigurationType.WORKFLOW]: 'WorkflowConfiguration',
  [WidgetConfigurationType.WORKFLOW_RUN]: 'WorkflowRunConfiguration',
  [WidgetConfigurationType.WORKFLOW_VERSION]: 'WorkflowVersionConfiguration',
};

export const normalizeMetadataEntityFromSSE = (
  entityKey: MetadataEntityKey,
  record: unknown,
): unknown => {
  if (
    entityKey === 'pageLayoutWidgets' &&
    isDefined(record) &&
    typeof record === 'object' &&
    'configuration' in record
  ) {
    const widget = record as Record<string, unknown>;
    const configuration = widget.configuration;

    if (
      isDefined(configuration) &&
      typeof configuration === 'object' &&
      !isNonEmptyString(
        (configuration as Record<string, unknown>).__typename,
      ) &&
      'configurationType' in configuration
    ) {
      const configurationType = (configuration as Record<string, unknown>)
        .configurationType as WidgetConfigurationType;
      const expectedTypename =
        CONFIGURATION_TYPE_TO_WIDGET_TYPENAME_MAP[configurationType];

      if (isDefined(expectedTypename)) {
        return {
          ...widget,
          configuration: {
            ...configuration,
            __typename: expectedTypename,
          },
        };
      }
    }
  }

  return record;
};
