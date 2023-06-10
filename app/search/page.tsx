import getSongsByTitle from "@/actions/getSongsByTitle"
import Header from "@/components/Header"
import SearchInput from "@/components/SearchInput"
import SearchContent from "./components/SearchContent"

export const revalidate = 30 
// false | 'force-cache' | 0 | number

interface Props {
  searchParams: {
		title: string
	}
}

const Search = async ({ searchParams }: Props) => {
	const songs = await getSongsByTitle(searchParams.title)
	
	return (
		<div
			className="
				bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
					<Header className="from-neutral-900">
						<div className="flex flex-col mb-2 gap-y-6">
							<h1 className="text-white text-3xl font-semibold">
								Search
							</h1>

							<SearchInput />
						</div>
					</Header>

					<SearchContent songs={songs}/>
		</div>
	)
}

export default Search