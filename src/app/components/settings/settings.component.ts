import { Component, inject } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { InputNumber } from "primeng/inputnumber";
import { Select } from "primeng/select";
import { Popover } from "primeng/popover";
import { ThemeService } from "@services/theme.service";
import { LanguageService } from "@services/language.service";
import { SettingsService } from "@services/settings.service";
import {
  AvailableIndentationMode,
  AvailableTheme,
  IndentationModeValue,
} from "@types";
import { SelectItemGroup } from "primeng/api";

@Component({
  selector: "app-settings",
  imports: [DropdownModule, FormsModule, InputNumber, Select, Popover],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  /** Minimum indentation size input number */
  protected readonly MIN_INDENTATION: number = 1;

  /** Maximum indentation size for the input number */
  protected readonly MAX_INDENTATION: number = 4;

  /**
   * Service for managing the currently selected theme.
   */
  protected themeService: ThemeService = inject(ThemeService);

  /**
   * Service for managing the currently selected programming language.
   */
  protected readonly languageService: LanguageService = inject(LanguageService);

  /**
   * Service for managing the highlighting settings.
   */
  private settingsService: SettingsService = inject(SettingsService);

  /**
   * List of available programming languages that the user can select.
   */
  protected groupedAvailableLanguages: SelectItemGroup[] = [
    {
      label: "Popular Languages",
      value: "common",
      items: this.languageService.getCommonLanguages(),
    },
    {
      label: "Other Languages",
      value: "others",
      items: this.languageService.getOtherLanguages(),
    },
  ];

  /**
   * List of available themes that the user can choose from.
   */
  protected availableThemes: AvailableTheme[] =
    this.themeService.getAvailableThemes();

  /**
   * List of available indentation modes (e.g., spaces or tabs) for the editor.
   */
  protected availableIndentationModes: AvailableIndentationMode[] =
    this.settingsService.getAvailableIndentationModes();

  /**
   * Gets the current indentation size setting from the editor settings.
   */
  get indentationSize(): number {
    return this.settingsService.editorSettings.indentationSize;
  }

  /**
   * Updates the indentation size setting in the editor settings.
   * @param size - The new indentation size value.
   */
  set indentationSize(size: number) {
    this.settingsService.updateSettings({ indentationSize: size });
  }

  /**
   * Gets the currently selected indentation mode (e.g., spaces or tabs).
   */
  get selectedIndentationMode(): IndentationModeValue {
    return this.settingsService.editorSettings.indentationMode;
  }

  /**
   * Updates the selected indentation mode setting in the editor settings.
   * @param mode - The new indentation mode value.
   */
  set selectedIndentationMode(mode: IndentationModeValue) {
    this.settingsService.updateSettings({ indentationMode: mode });
  }
}
