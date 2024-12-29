import logo from "../../public/favicon.ico";

import { FC } from "react";

const MyLogo: FC = () => {
	return (
		<div>
			<img src={logo.src} alt="My Logo" width={25} height={25} />
		</div>
	);
};

export { MyLogo };
