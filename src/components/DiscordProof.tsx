
import { discordProofContent } from "@/consts/site.const";

type DiscordProofProps = {
  imageUrl: string;
};

const DiscordProof = ({ imageUrl }: DiscordProofProps) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg max-w-xs">
      <div className="bg-tradingbg-700 p-2 border-b border-gray-700 flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="text-xs text-gray-300 ml-2">{discordProofContent.windowLabel}</div>
      </div>
      <div className="relative">
        <img src={imageUrl} alt={discordProofContent.imageAlt} className="w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tradingbg-800/50 to-transparent"></div>
      </div>
      <div className="bg-tradingbg-700 p-3">
        <p className="text-mintgreen-300 text-sm font-medium">{discordProofContent.title}</p>
        <p className="text-gray-300 text-xs">{discordProofContent.subtitle}</p>
      </div>
    </div>
  );
};

export default DiscordProof;
