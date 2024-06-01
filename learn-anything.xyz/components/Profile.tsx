export default function Profile() {
	return (
		<div>
			<div className="flex-between h-[74px] p-[20px]">
				<div className="text-[25px] font-bold">Profile</div>
				<h1>Set</h1>
			</div>
			<div className="px-[41px] p-[20px] flex gap-[40px]">
				<div className="w-[130px] h-[130px] border-dashed border rounded-[7px] border-white/10 bg-white bg-opacity-[0.02] flex-center text-white/40">
					{/* <Icon name="Plus" /> */}
				</div>
				<div className="col-gap-[20px]">
					<input
						type="text"
						placeholder="Your name"
						className="bg-[#121212] outline-none rounded-[7px] placeholder-white/20 w-[400px] px-[14px] p-[13px]"
					/>
					<div>
						<input
							type="text"
							placeholder="Username"
							className="bg-[#121212] outline-none rounded-[7px] placeholder-white/20  w-[400px] px-[14px] p-[13px]"
						/>
						<div className="text-[14px] pt-[10px] text-white/20">
							learn-anything.xyz/@
						</div>
					</div>
					<input
						type="text"
						placeholder="Website"
						className="bg-[#121212] outline-none rounded-[7px] placeholder-white/20  w-[400px] px-[14px] p-[13px]"
					/>
				</div>
			</div>
		</div>
	)
}
