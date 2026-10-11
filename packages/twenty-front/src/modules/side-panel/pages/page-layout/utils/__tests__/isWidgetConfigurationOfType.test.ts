import { isWidgetConfigurationOfType } from '@/side-panel/pages/page-layout/utils/isWidgetConfigurationOfType';
import { WidgetConfigurationType } from '~/generated-metadata/graphql';
import {
  ALL_CHART_CONFIGURATIONS,
  TEST_BAR_CHART_CONFIGURATION,
  TEST_IFRAME_CONFIGURATION,
  TEST_PIE_CHART_CONFIGURATION,
  TEST_STANDALONE_RICH_TEXT_CONFIGURATION,
} from '~/testing/mock-data/widget-configurations';

describe('isWidgetConfigurationOfType', () => {
  it('returns true when __typename matches', () => {
    expect(
      isWidgetConfigurationOfType(
        TEST_BAR_CHART_CONFIGURATION,
        'BarChartConfiguration',
      ),
    ).toBe(true);
  });

  it('returns false when __typename does not match', () => {
    expect(
      isWidgetConfigurationOfType(
        TEST_BAR_CHART_CONFIGURATION,
        'PieChartConfiguration',
      ),
    ).toBe(false);
  });

  it('returns false for null configuration', () => {
    expect(isWidgetConfigurationOfType(null, 'BarChartConfiguration')).toBe(
      false,
    );
  });

  it('returns false for undefined configuration', () => {
    expect(
      isWidgetConfigurationOfType(undefined, 'BarChartConfiguration'),
    ).toBe(false);
  });

  it('correctly identifies PieChartConfiguration', () => {
    expect(
      isWidgetConfigurationOfType(
        TEST_PIE_CHART_CONFIGURATION,
        'PieChartConfiguration',
      ),
    ).toBe(true);
  });

  it('correctly identifies IframeConfiguration', () => {
    expect(
      isWidgetConfigurationOfType(
        TEST_IFRAME_CONFIGURATION,
        'IframeConfiguration',
      ),
    ).toBe(true);
  });

  it('correctly identifies StandaloneRichTextConfiguration', () => {
    expect(
      isWidgetConfigurationOfType(
        TEST_STANDALONE_RICH_TEXT_CONFIGURATION,
        'StandaloneRichTextConfiguration',
      ),
    ).toBe(true);
  });

  it('works with all chart configuration types', () => {
    ALL_CHART_CONFIGURATIONS.forEach((config) => {
      expect(isWidgetConfigurationOfType(config, config.__typename!)).toBe(
        true,
      );
    });
  });

  it('identifies configuration when __typename is absent and configurationType matches', () => {
    const frontComponentConfigWithoutTypename = {
      configurationType: WidgetConfigurationType.FRONT_COMPONENT,
      frontComponentId: 'front-comp-123',
    };

    expect(
      isWidgetConfigurationOfType(
        frontComponentConfigWithoutTypename,
        'FrontComponentConfiguration',
      ),
    ).toBe(true);
  });

  it('returns false when __typename is absent and configurationType does not match', () => {
    const frontComponentConfigWithoutTypename = {
      configurationType: WidgetConfigurationType.FRONT_COMPONENT,
      frontComponentId: 'front-comp-123',
    };

    expect(
      isWidgetConfigurationOfType(
        frontComponentConfigWithoutTypename,
        'BarChartConfiguration',
      ),
    ).toBe(false);
  });

  it('returns false when configuration has neither __typename nor configurationType', () => {
    const emptyConfig = {};

    expect(
      isWidgetConfigurationOfType(
        emptyConfig as any,
        'FrontComponentConfiguration',
      ),
    ).toBe(false);
  });

  it('returns false when __typename does not match even if configurationType is absent', () => {
    const mismatchedConfig = {
      __typename: 'BarChartConfiguration',
    };

    expect(
      isWidgetConfigurationOfType(
        mismatchedConfig as any,
        'FrontComponentConfiguration',
      ),
    ).toBe(false);
  });

  it('returns false safely when configuration is a primitive value', () => {
    expect(
      isWidgetConfigurationOfType(
        'corrupt-string' as any,
        'FrontComponentConfiguration',
      ),
    ).toBe(false);
    expect(
      isWidgetConfigurationOfType(12345 as any, 'FrontComponentConfiguration'),
    ).toBe(false);
    expect(
      isWidgetConfigurationOfType(true as any, 'FrontComponentConfiguration'),
    ).toBe(false);
  });

  it('returns false when typename is unknown or invalid', () => {
    const config = {
      configurationType: WidgetConfigurationType.FRONT_COMPONENT,
    };

    expect(
      isWidgetConfigurationOfType(
        config as any,
        'NonExistentConfiguration' as any,
      ),
    ).toBe(false);
  });
});
