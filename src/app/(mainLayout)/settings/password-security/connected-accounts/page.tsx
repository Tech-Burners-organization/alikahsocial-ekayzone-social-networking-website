import type { Metadata } from "next";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import PageWraper from "@/components/ui/CustomUi/PageWraper";
import TagButton from "../../_components/TagButton";
import { getConnectedAccounts } from "../../_lib/data";

export const metadata: Metadata = {
    title: "Connected Accounts | eKayzone",
};

export default function ConnectedAccountsPage() {
    const accounts = getConnectedAccounts();

    return (
        <PageWraper title="Connected Accounts" backToPreviousPage>
            <div className="flex flex-col gap-4">
                {accounts.map((account) => (
                    <div
                        key={account.id}
                        className="flex items-center justify-between gap-4 rounded-[20px] border border-[#e5e8ea] bg-white p-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)]"
                    >
                        <div className="flex items-center gap-[11px]">
                            {account.provider === "google" ? (
                                <FcGoogle className="size-6 shrink-0" />
                            ) : (
                                <FaApple className="size-6 shrink-0" />
                            )}
                            <div className="flex flex-col">
                                <p className="text-base font-bold leading-6 text-[#1b1c1c]">
                                    {account.label}
                                </p>
                                {account.account && (
                                    <p className="text-base font-medium text-[#5e6062]">
                                        {account.account}
                                    </p>
                                )}
                            </div>
                        </div>

                        <TagButton
                            label={account.connected ? "Disconnect" : "Connect"}
                            toastMessage={
                                account.connected
                                    ? `${account.label} disconnected`
                                    : `${account.label} connected`
                            }
                        />
                    </div>
                ))}
            </div>
        </PageWraper>
    );
}
