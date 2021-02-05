import { FN001001_DEP_microsoft_sp_core_library } from "./rules/FN001001_DEP_microsoft_sp_core_library";
import { FN001002_DEP_microsoft_sp_lodash_subset } from "./rules/FN001002_DEP_microsoft_sp_lodash_subset";
import { FN001003_DEP_microsoft_sp_office_ui_fabric_core } from "./rules/FN001003_DEP_microsoft_sp_office_ui_fabric_core";
import { FN001004_DEP_microsoft_sp_webpart_base } from "./rules/FN001004_DEP_microsoft_sp_webpart_base";
import { FN001011_DEP_microsoft_sp_dialog } from "./rules/FN001011_DEP_microsoft_sp_dialog";
import { FN001012_DEP_microsoft_sp_application_base } from "./rules/FN001012_DEP_microsoft_sp_application_base";
import { FN001013_DEP_microsoft_decorators } from "./rules/FN001013_DEP_microsoft_decorators";
import { FN001014_DEP_microsoft_sp_listview_extensibility } from "./rules/FN001014_DEP_microsoft_sp_listview_extensibility";
import { FN001023_DEP_microsoft_sp_component_base } from "./rules/FN001023_DEP_microsoft_sp_component_base";
import { FN001024_DEP_microsoft_sp_diagnostics } from "./rules/FN001024_DEP_microsoft_sp_diagnostics";
import { FN001025_DEP_microsoft_sp_dynamic_data } from "./rules/FN001025_DEP_microsoft_sp_dynamic_data";
import { FN001026_DEP_microsoft_sp_extension_base } from "./rules/FN001026_DEP_microsoft_sp_extension_base";
import { FN001027_DEP_microsoft_sp_http } from "./rules/FN001027_DEP_microsoft_sp_http";
import { FN001028_DEP_microsoft_sp_list_subscription } from "./rules/FN001028_DEP_microsoft_sp_list_subscription";
import { FN001029_DEP_microsoft_sp_loader } from "./rules/FN001029_DEP_microsoft_sp_loader";
import { FN001030_DEP_microsoft_sp_module_interfaces } from "./rules/FN001030_DEP_microsoft_sp_module_interfaces";
import { FN001031_DEP_microsoft_sp_odata_types } from "./rules/FN001031_DEP_microsoft_sp_odata_types";
import { FN001032_DEP_microsoft_sp_page_context } from "./rules/FN001032_DEP_microsoft_sp_page_context";
import { FN002001_DEVDEP_microsoft_sp_build_web } from "./rules/FN002001_DEVDEP_microsoft_sp_build_web";
import { FN002002_DEVDEP_microsoft_sp_module_interfaces } from "./rules/FN002002_DEVDEP_microsoft_sp_module_interfaces";
import { FN002003_DEVDEP_microsoft_sp_webpart_workbench } from "./rules/FN002003_DEVDEP_microsoft_sp_webpart_workbench";
import { FN002009_DEVDEP_microsoft_sp_tslint_rules } from "./rules/FN002009_DEVDEP_microsoft_sp_tslint_rules";
import { FN010001_YORC_version } from "./rules/FN010001_YORC_version";
import { FN014006_CODE_launch_sourceMapPathOverrides } from "./rules/FN014006_CODE_launch_sourceMapPathOverrides";
import { FN018005_TEAMS_deprecated_manifest } from "./rules/FN018005_TEAMS_deprecated_manifest";
import { FN020001_RES_types_react } from "./rules/FN020001_RES_types_react";

module.exports = [
  new FN001001_DEP_microsoft_sp_core_library('1.7.1'),
  new FN001002_DEP_microsoft_sp_lodash_subset('1.7.1'),
  new FN001003_DEP_microsoft_sp_office_ui_fabric_core('1.7.1'),
  new FN001004_DEP_microsoft_sp_webpart_base('1.7.1'),
  new FN001011_DEP_microsoft_sp_dialog('1.7.1'),
  new FN001012_DEP_microsoft_sp_application_base('1.7.1'),
  new FN001013_DEP_microsoft_decorators('1.7.1'),
  new FN001014_DEP_microsoft_sp_listview_extensibility('1.7.1'),
  new FN001023_DEP_microsoft_sp_component_base('1.7.1'),
  new FN001024_DEP_microsoft_sp_diagnostics('1.7.1'),
  new FN001025_DEP_microsoft_sp_dynamic_data('1.7.1'),
  new FN001026_DEP_microsoft_sp_extension_base('1.7.1'),
  new FN001027_DEP_microsoft_sp_http('1.7.1'),
  new FN001028_DEP_microsoft_sp_list_subscription('1.7.1'),
  new FN001029_DEP_microsoft_sp_loader('1.7.1'),
  new FN001030_DEP_microsoft_sp_module_interfaces('1.7.1'),
  new FN001031_DEP_microsoft_sp_odata_types('1.7.1'),
  new FN001032_DEP_microsoft_sp_page_context('1.7.1'),
  new FN002001_DEVDEP_microsoft_sp_build_web('1.7.1'),
  new FN002002_DEVDEP_microsoft_sp_module_interfaces('1.7.1'),
  new FN002003_DEVDEP_microsoft_sp_webpart_workbench('1.7.1'),
  new FN002009_DEVDEP_microsoft_sp_tslint_rules('1.7.1'),
  new FN010001_YORC_version('1.7.1'),
  new FN014006_CODE_launch_sourceMapPathOverrides('webpack:///.././src/*', '${webRoot}/src/*'),
  new FN020001_RES_types_react('16.4.2'),
  new FN018005_TEAMS_deprecated_manifest()
];