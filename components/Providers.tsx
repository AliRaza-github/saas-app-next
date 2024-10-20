//  'use client'
// import { trpc } from '@/app/_trpc/client'
// // import { absoluteUrl } from '@/lib/utils'
// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import { httpBatchLink } from '@trpc/client'
// import { PropsWithChildren, useState } from 'react'

// const Providers = ({ children }: PropsWithChildren) => {
//   const [queryClient] = useState(() => new QueryClient())
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({         
//           url: "http://localhost:3000/api/trpc",
//         }),
//       ],
//     })
//   )

//   return (
//     <trpc.Provider
//       client={trpcClient}
//       queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>
//         {children}
//       </QueryClientProvider>
//     </trpc.Provider>
//   )
// }

// export default Providers


// components/Providers.tsx

'use client'
import { trpc } from '@/app/_trpc/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: 500,
      },
    },
  }))
  
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({         
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include', // This is important for auth
            })
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers