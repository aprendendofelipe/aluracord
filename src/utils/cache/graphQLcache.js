import { concatPagination } from '@apollo/client/utilities'
import appConfig from '../../../config.json'

const uri = appConfig.GitHubAPIgraphQL
const cacheOptions = {
    typePolicies: {
      Query: {
        fields: {
          SearchUsers: concatPagination(),
        },
      },
    },
  }
