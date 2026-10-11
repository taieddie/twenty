import {
  CONFIGURATION_TYPE_TO_WIDGET_TYPENAME_MAP,
  normalizeMetadataEntityFromSSE,
} from '@/metadata-store/utils/normalizeMetadataEntityFromSSE';
import { WidgetConfigurationType } from '~/generated-metadata/graphql';

describe('normalizeMetadataEntityFromSSE', () => {
  it('should inject __typename when pageLayoutWidgets configuration lacks __typename', () => {
    const rawSseWidget = {
      id: 'widget-1',
      pageLayoutTabId: 'tab-1',
      type: 'FRONT_COMPONENT',
      configuration: {
        configurationType: WidgetConfigurationType.FRONT_COMPONENT,
        frontComponentId: 'component-123',
      },
    };

    const normalized = normalizeMetadataEntityFromSSE(
      'pageLayoutWidgets',
      rawSseWidget,
    ) as Record<string, any>;

    expect(normalized.configuration.__typename).toBe(
      'FrontComponentConfiguration',
    );
    expect(normalized.configuration.configurationType).toBe(
      WidgetConfigurationType.FRONT_COMPONENT,
    );
    expect(normalized.configuration.frontComponentId).toBe('component-123');
  });

  it('should inject __typename for field widgets and chart widgets', () => {
    const rawFieldWidget = {
      id: 'widget-field',
      type: 'FIELD',
      configuration: {
        configurationType: WidgetConfigurationType.FIELD,
        fieldMetadataId: 'field-123',
      },
    };

    const normalizedField = normalizeMetadataEntityFromSSE(
      'pageLayoutWidgets',
      rawFieldWidget,
    ) as Record<string, any>;

    expect(normalizedField.configuration.__typename).toBe('FieldConfiguration');

    const rawChartWidget = {
      id: 'widget-chart',
      type: 'GRAPH',
      configuration: {
        configurationType: WidgetConfigurationType.BAR_CHART,
      },
    };

    const normalizedChart = normalizeMetadataEntityFromSSE(
      'pageLayoutWidgets',
      rawChartWidget,
    ) as Record<string, any>;

    expect(normalizedChart.configuration.__typename).toBe(
      'BarChartConfiguration',
    );
  });

  it('should preserve existing __typename if already defined', () => {
    const widgetWithTypename = {
      id: 'widget-2',
      configuration: {
        __typename: 'CustomTypename',
        configurationType: WidgetConfigurationType.FRONT_COMPONENT,
      },
    };

    const result = normalizeMetadataEntityFromSSE(
      'pageLayoutWidgets',
      widgetWithTypename,
    ) as typeof widgetWithTypename;

    expect(result.configuration.__typename).toBe('CustomTypename');
  });

  it('should not alter non-widget entities', () => {
    const viewEntity = {
      id: 'view-1',
      name: 'Default View',
    };

    const result = normalizeMetadataEntityFromSSE('views', viewEntity);

    expect(result).toBe(viewEntity);
  });

  it('should handle null, undefined, or empty objects safely', () => {
    expect(
      normalizeMetadataEntityFromSSE('pageLayoutWidgets', null),
    ).toBeNull();
    expect(
      normalizeMetadataEntityFromSSE('pageLayoutWidgets', undefined),
    ).toBeUndefined();
    expect(normalizeMetadataEntityFromSSE('pageLayoutWidgets', {})).toEqual({});
  });

  it('should have all 29 widget configuration types mapped in CONFIGURATION_TYPE_TO_WIDGET_TYPENAME_MAP', () => {
    const expectedCount = Object.keys(WidgetConfigurationType).length;
    expect(
      Object.keys(CONFIGURATION_TYPE_TO_WIDGET_TYPENAME_MAP).length,
    ).toBeGreaterThanOrEqual(expectedCount);
  });
});
