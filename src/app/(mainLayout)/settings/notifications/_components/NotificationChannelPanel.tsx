import SettingsSection from "../../_components/SettingsSection";
import SettingsToggleRow from "../../_components/SettingsToggleRow";
import type { NotificationChannel } from "../../_lib/data";

/**
 * Shared layout for the Push / Email / SMS preference screens: a standalone master-toggle
 * card, then a card of individual preferences.
 */
export default function NotificationChannelPanel({ channel }: { channel: NotificationChannel }) {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection flush>
                <SettingsToggleRow
                    label={channel.master.label}
                    description={channel.master.description}
                    defaultChecked={channel.master.defaultChecked}
                />
            </SettingsSection>

            <SettingsSection flush>
                {channel.preferences.map((preference) => (
                    <SettingsToggleRow
                        key={preference.label}
                        label={preference.label}
                        description={preference.description}
                        defaultChecked={preference.defaultChecked}
                        locked={preference.locked}
                    />
                ))}
            </SettingsSection>
        </div>
    );
}
