import Adw from 'gi://Adw';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import Gio from 'gi://Gio';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const Settings = GObject.registerClass({
    GTypeName: 'Settings',
    Template: GLib.uri_resolve_relative(import.meta.url, './settings.ui', GLib.UriFlags.NONE),
    InternalChildren: [
        'always_on_top',
        'always_on_visible_workspace',
        'remember_position',
        'use_custom_position'
    ],
}, class Settings extends Adw.PreferencesPage {
    constructor(settings) {
        super({});

        this._settings = settings;

        this._settings.bind(
            'always-on-top', this._always_on_top, 'active',
            Gio.SettingsBindFlags.DEFAULT
        );

        /*this._settings.bind(
            'always-on-visible-workspace', this.builder._always_on_top, 'active',
            Gio.SettingsBindFlags.DEFAULT
        );

        this._settings.bind(
            'remember-position', this._always_on_top, 'active',
            Gio.SettingsBindFlags.DEFAULT
        );

        this._settings.bind(
            'enable-custom-position', this._always_on_top, 'active',
            Gio.SettingsBindFlags.DEFAULT
        );*/
    }
});

export default class FirefoxPIPPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window.add(new Settings(this.getSettings()));
    }
}